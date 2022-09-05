import React from "react";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { useMe } from "../../hooks/useMe";
import { userEdit, userEditVariables } from "../../__generated__/userEdit";
import { Helmet } from "react-helmet";

interface IFormProps {
  email?: string;
  password?: string;
}

const EDIT_PROFILE_MUTATION = gql`
  mutation userEdit($input: userEditInput!) {
    userEdit(input: $input) {
      ok
      error
    }
  }
`;

export const EditProfile = () => {
  const { data: userData } = useMe();
  console.log(userData?.me.email);
  const client = useApolloClient();
  const {
    register,
    getValues,
    formState,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
    },
  });
  // const onSubmit = () => {
  //   const { email, password } = getValues();
  //   editUser({
  //     variables: {
  //       input: {
  //         email,
  //         ...(password !== "" && { password }),
  //       },
  //     },
  //   });
  // };
  // const onCompleted = (data: userEdit) => {
  //   const {
  //     userEdit: { ok },
  //   } = data;
  //   if (ok && userData) {
  //     const {
  //       me: { email: prevEmail, id },
  //     } = userData;
  //     const { email: newEmail } = getValues();
  //     if (prevEmail !== newEmail) {
  //       client.writeFragment({
  //         id: `User:${id}`,
  //         fragment: gql`
  //           fragment EditedUser on User {
  //             verified
  //             email
  //           }
  //         `,
  //         data: {
  //           email: newEmail,
  //           verified: false,
  //         },
  //       });
  //     }
  //   }
  // };
  const [editUser, { loading }] = useMutation<userEdit, userEditVariables>(
    EDIT_PROFILE_MUTATION
    // { onCompleted }
  );
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <Helmet>
        <title>Edit Profile | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          {...register("email", {
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          className="input"
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          {...register("password")}
          className="input"
          name="password"
          type="password"
          placeholder="Password"
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Save Profile"
        />
      </form>
    </div>
  );
};
