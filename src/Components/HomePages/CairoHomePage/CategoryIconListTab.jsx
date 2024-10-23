import CheckBoxField from "@/Components/InputFields/CheckBoxField";
import MultiSelectField from "@/Components/InputFields/MultiSelectField";
import SimpleInputField from "@/Components/InputFields/SimpleInputField";

import { useTranslation } from "react-i18next";
import { useContext } from "react";

const CategoryIconListTab = ({
  values,
  setFieldValue,
  categoryData,
  category,
  status,
  name,
}) => {
  
  const { t } = useTranslation( "common");
  return (
    <>
      {name && (
        <SimpleInputField
          nameList={[
            {
              name: `[content][${name}][title]`,
              placeholder: t("EnterTitle"),
              title: "Title",
            },
          ]}
        />
      )}
      <MultiSelectField
        values={values}
        setFieldValue={setFieldValue}
        name={category}
        title="Categories"
        data={categoryData}
      />
      <CheckBoxField name={`[content][${status}][status]`} title="Status" />
    </>
  );
};

export default CategoryIconListTab;
