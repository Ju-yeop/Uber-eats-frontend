interface IDishOptionProps {
  isSelected: boolean;
  name: string;
  dishId: number;
  extra?: number | null;
  addOptionToItem: (dishId: number, optionName: string) => void;
  removeOptionToItem: (dishId: number, optionName: string) => void;
}

export const DishOption: React.FC<IDishOptionProps> = ({
  isSelected,
  name,
  extra,
  dishId,
  addOptionToItem,
  removeOptionToItem,
}) => {
  const onClick = () => {
    if (isSelected) {
      removeOptionToItem(dishId, name);
    } else {
      addOptionToItem(dishId, name);
    }
  };
  return (
    <span
      onClick={onClick}
      className={`border px-2 py-1 ${
        isSelected ? "border-gray-800" : "hover:border-gray-800"
      }`}
    >
      <span className="mr-2">{name}</span>
      {<span className="text-sm opacity-75">(${extra})</span>}
    </span>
  );
};
