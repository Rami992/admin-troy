'use client'
import FaqForm from "@/Components/Faq/FaqForm";
import { FaqAPI } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";

const CreateFaq = () => {
    const { mutate, isLoading } = useCreate(FaqAPI, false, FaqAPI);
    return (
        <FormWrapper title="AddFaq">
            <FaqForm loading={isLoading} mutate={mutate} buttonName="Save" />
        </FormWrapper>
    )
}

export default CreateFaq