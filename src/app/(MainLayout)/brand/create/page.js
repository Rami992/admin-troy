'use client'
import BrandForm from "@/Components/Brand/BrandForm";
import { BrandAPI } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";

const CreateBrand = () => {
  const { mutate, isLoading } = useCreate(BrandAPI, false, "/brand");
  return (
    <FormWrapper title="CreateBrand">
      <BrandForm loading={isLoading} mutate={mutate} buttonName="Save"/>
    </FormWrapper>
  );
};

export default CreateBrand;
