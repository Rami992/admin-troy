"use client";
import AttributeForm from "@/Components/Attribute/AttributeForm";
import { attribute } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useUpdate from "@/Utils/Hooks/useUpdate";

const UpdateAttributes = ({ params }) => {

  const { mutate, isLoading } = useUpdate(attribute,params?.updateId,`/attribute`);
  return (
    params?.updateId && (
      <FormWrapper title="EditAttribute">
        <AttributeForm
          mutate={mutate}
          updateId={params?.updateId}
          loading={isLoading}
          buttonName="Update"
        />
      </FormWrapper>
    )
  );
};

export default UpdateAttributes;
