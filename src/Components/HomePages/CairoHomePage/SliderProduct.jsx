import FileUploadField from "@/Components/InputFields/FileUploadField";
import SearchableSelectInput from "@/Components/InputFields/SearchableSelectInput";
import SimpleInputField from "@/Components/InputFields/SimpleInputField";

import { getHelperText } from "@/Utils/CustomFunctions/getHelperText";
import { useTranslation } from "react-i18next";
import { useContext } from "react";

const SliderProduct = ({ values, setFieldValue, productData, setSearch }) => {
  
  const { t } = useTranslation( "common");

  return (
    <>
      <FileUploadField
        name="sliderImage"
        title="Image"
        id="sliderImage"
        showImage={values["sliderImage"]}
        type="file"
        values={values}
        setFieldValue={setFieldValue}
        helpertext={getHelperText("1859x550px")}
      />

      <SimpleInputField
        nameList={[
          {
            name: `[content][slider_product][title]`,
            placeholder: t("EnterTitle"),
            title: "Title",
          },
          {
            name: `[content][slider_product][description]`,
            placeholder: t("EnterSubTitle"),
            title: "Title",
          },
        ]}
      />
      <SearchableSelectInput
        nameList={[
          {
            name: "sliderProductIds",
            title: "Products",
            inputprops: {
              name: "sliderProductIds",
              id: "sliderProductIds",
              options: productData || [],
              setsearch: setSearch,
            },
          },
        ]}
      />
    </>
  );
};

export default SliderProduct;
