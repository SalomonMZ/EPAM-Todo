export interface ITodo {
  id: number;
  description: string;
  isComplete: boolean;
  dueDate: string;
}

type Props = {
  todo: ITodo;
  handleOnChange: (id: number) => void;
};

const formattedDate = (date: string): string => {
  const fDate = new Date(date);
  const formatter = new Intl.DateTimeFormat();
  return isNaN(fDate.valueOf()) ? "" : formatter.format(fDate);
};

const isOverDue = (date: string): boolean => {
  const currentDate = new Date().getTime();
  const fDate = new Date(date).getTime();
  return currentDate > fDate;
};

function Todo({
  todo: { id, description, dueDate, isComplete },
  handleOnChange,
}: Props) {
  return (
    <li
      className={`mt-2 flex justify-between items-center ${
        isComplete
          ? "bg-green-300"
          : dueDate
          ? isOverDue(dueDate)
            ? "bg-red-300"
            : "bg-gray-200"
          : "bg-gray-200"
      }`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isComplete}
          name="description"
          onChange={() => handleOnChange(id)}
          className="m-2"
        />
        <label htmlFor="description" className="mr-2">
          {description}
        </label>
      </div>
      <p
        className={`w-32 m-1 flex justify-center items-center ${
          dueDate ? "border-2" : ""
        } border-solid border-black`}
      >
        {formattedDate(dueDate)}
      </p>
    </li>
  );
}

export default Todo;
