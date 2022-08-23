import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { CreateOrderItemInput } from "../../__generated__/globalTypes";
import {
  restaurant,
  restaurantVariables,
} from "../../__generated__/restaurant";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
    }
  }
`;

interface IRestaurantParams {
  id: string;
}

export const Restaurant = () => {
  const { id } = useParams() as unknown as IRestaurantParams;
  const { loading, data } = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +id,
        },
      },
    }
  );
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const triggerStartOrder = () => {
    setOrderStarted(true);
  };
  const getItem = (dishId: number) => {
    return orderItems.find((order) => order.dishId === dishId);
  };
  const addItemToOrder = (dishId: number) => {
    setOrderItems((current) => [{ dishId, options: [] }, ...current]);
    console.log(orderItems);
  };

  const removeFromOrder = (dishId: number) => {
    setOrderItems((current) =>
      current.filter((item) => item.dishId !== dishId)
    );
    console.log(orderItems);
  };

  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };

  const addOptionToItem = (dishId: number, option: any) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      const hasOption = Boolean(
        oldItem.options?.find((aOption) => aOption.name === option.name)
      );
      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems((current) => [
          { dishId, options: [option, ...oldItem.options!] },
          ...current,
        ]);
      }
    }
  };
  const getOptionFromItem = (
    item: CreateOrderItemInput,
    optionName: string
  ) => {
    return item.options?.find((option) => option.name === optionName);
  };
  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
  };

  return (
    <div>
      <Helmet>
        <title>{data?.restaurant.restaurant?.name || ""} | Nuber Eats</title>
      </Helmet>
      <div
        className=" bg-gray-800 bg-center bg-cover py-48"
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
        }}
      >
        <div className="bg-white w-3/12 py-8 pl-48">
          <h4 className="text-4xl mb-3">{data?.restaurant.restaurant?.name}</h4>
          <h5 className="text-sm font-light mb-2">
            {data?.restaurant.restaurant?.category?.name}
          </h5>
          <h6 className="text-sm font-light">
            {data?.restaurant.restaurant?.address}
          </h6>
        </div>
      </div>
      <div className="container pb-32 flex flex-col items-end mt-20">
        <button onClick={triggerStartOrder} className="btn px-10">
          {orderStarted ? "Ordering" : "Start Order"}
        </button>
        <div className="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
          {data?.restaurant.restaurant?.menu.map((dish, index) => (
            <Dish
              isSelected={isSelected(dish.id)}
              id={dish.id}
              orderStarted={orderStarted}
              key={index}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              isCustomer={true}
              options={dish.options}
              addItemToOrder={addItemToOrder}
              removeFromOrder={removeFromOrder}
            >
              {dish.options?.map((option, index) => (
                <span
                  onClick={() =>
                    addOptionToItem
                      ? addOptionToItem(dish.id, {
                          name: option.name,
                        })
                      : null
                  }
                  className={`flex border items-center ${
                    isOptionSelected(dish.id, option.name)
                      ? "border-gray-800"
                      : ""
                  }`}
                  key={index}
                >
                  <h6 className="mr-2">{option.name}</h6>
                  <h6 className="text-sm opacity-75">(${option.extra})</h6>
                </span>
              ))}
            </Dish>
          ))}
        </div>
      </div>
    </div>
  );
};
