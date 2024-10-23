import React, { useCallback, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Row, Col, Card } from "reactstrap";
import FormBtn from "../../Elements/Buttons/FormBtn";
import request from "../../Utils/AxiosUtils";
import { product } from "../../Utils/AxiosUtils/API";
import { YupObject, nameSchema } from "../../Utils/Validation/ValidationSchemas";
import Loader from "../CommonComponent/Loader";
import TabForProduct from '@/Components/Product/Widgets/TabForProduct';
import { ProductInitValues, ProductValidationSchema } from "./Widgets/ProductObjects";
import ProductSubmitFunction from "./Widgets/ProductSubmitFunction";
import SettingContext from "../../Helper/SettingContext";
import AllProductTabs from "../Product/Widgets/AllProductTabs";
import { useTranslation } from "react-i18next";
import Btn from "@/Elements/Buttons/Btn";
import { useRouter } from "next/navigation";
import AccountContext from "@/Helper/AccountContext";

const ProductForm = ({ mutate, loading, updateId, title, buttonName, saveButton, setSaveButton }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [activeTab, setActiveTab] = useState("1");
  const { state } = useContext(SettingContext)
  const { data: oldData, isLoading: oldDataLoading, refetch, status } = useQuery([updateId], () => request({ url: `${product}/${updateId}` }, router), { refetchOnWindowFocus: false, enabled: false, select: (data) => data.data });
  useEffect(() => {
    if (updateId) {
      !saveButton && refetch();
    }
  }, [updateId]);
  const watchEvent = useCallback((oldData, updateId) => {
    return ProductInitValues(oldData, updateId)
  }, [oldData, updateId])
  const { role, accountData } = useContext(AccountContext)


  if ((updateId && oldDataLoading)) return <Loader />;
  return (
    <Formik
      initialValues={{ ...watchEvent(oldData, updateId) }}
      validationSchema={YupObject({
        ...ProductValidationSchema,
        store_id: state?.isMultiVendor && role === 'admin' && nameSchema
      })}
      onSubmit={(values) => {
        if (updateId) {
          values["_method"] = "put"
        }
        if (role == "vendor") {
          values["store_id"] = accountData?.store?.id
        }
        if (!values["watermark"]) {
          values["watermark_image_id"] = ""
        }
        if (!values["is_licensable"]) {
          values["separator", "license_key"] = ""
        }
        ProductSubmitFunction(mutate, values, updateId);
      }}>
      {({ values, setFieldValue, errors, touched, isSubmitting, setErrors, setTouched }) => (
        <Form className="theme-form theme-form-2 mega-form vertical-tabs">
          <Row>
            <Col>
              <Card>
                <div className="title-header option-title">
                  <h5>{t(title)}</h5>
                </div>
                <Row>
                  <Col xl="3" lg="4">
                    <TabForProduct values={values} activeTab={activeTab} setActiveTab={setActiveTab} errors={errors} touched={touched} />
                  </Col>
                  <AllProductTabs setErrors={setErrors} setTouched={setTouched} touched={touched} values={values} activeTab={activeTab} isSubmitting={isSubmitting} setFieldValue={setFieldValue} errors={errors} updateId={updateId} setActiveTab={setActiveTab} />
                  <div className="ms-auto justify-content-end dflex-wgap mt-sm-4 mt-2 save-back-button">
                    <Btn className="btn-outline" title="Back" onClick={() => router.back()} />
                    {updateId && <Btn className="btn-outline" type="submit" title={`save&Continue`} onClick={() => setSaveButton(true)} />}
                    <Btn className="btn-primary" type="submit" title={buttonName} onClick={() => setSaveButton && setSaveButton(false)} />
                  </div>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;