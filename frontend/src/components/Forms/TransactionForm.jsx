import React from "react";

import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { Title, Category, Add, Amount } from "../../utils/Icons";

const TransactionForm = ({
  categories,
  formData,
  button,
  btnColor,
  hasErrors,
  errors,
  isLoading,
  handleOnChange,
  handleDateChange,
  handleSubmit,
}) => {
  const { title, amount, description, category, date } = formData;

  return (
    <form className="flex flex-col justify-center items-center space-y-4 w-full lg:w-[45%]">
      <Input
        label="Title"
        placeholder="Enter the title"
        name="title"
        value={title}
        onChange={handleOnChange}
        isInvalid={!!errors.title}
        errorMessage={errors?.title}
        startContent={<Title />}
        className="text-gray-500"
      />
      <Input
        type="number"
        label="Amount"
        placeholder="Enter the amount"
        name="amount"
        value={amount}
        onChange={handleOnChange}
        isInvalid={!!errors.amount}
        errorMessage={errors?.amount}
        startContent={<Amount />}
        className="text-gray-500"
      />
      <div className="w-full grid grid-cols-2 gap-x-2">
        <Select
          name="category"
          label="Category"
          placeholder="Select the category"
          value={category}
          onChange={handleOnChange}
          isInvalid={!!errors.category}
          errorMessage={errors?.category}
          startContent={<Category />}
          className="text-gray-500"
        >
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </Select>
        <DatePicker
          name="date"
          label="Select the date"
          value={date}
          onChange={handleDateChange}
          isInvalid={!!errors.date}
          errorMessage={errors?.date}
        />
      </div>
      <Textarea
        name="description"
        label="Description"
        placeholder="Enter your description"
        maxRows={4}
        value={description}
        onChange={handleOnChange}
        isInvalid={!!errors.description}
        errorMessage={errors?.description}
      />
      <Button
        color={btnColor}
        startContent={<Add />}
        className="text-white"
        isLoading={isLoading}
        onClick={handleSubmit}
        isDisabled={
          !title || !amount || !category || !date || !description || hasErrors
        }
      >
        {button}
      </Button>
    </form>
  );
};

export default TransactionForm;
