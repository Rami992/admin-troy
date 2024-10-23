import Loader from "@/Components/CommonComponent/Loader";
import request from "@/Utils/AxiosUtils";
import { Category, product } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Col, TabContent, TabPane } from "reactstrap";
import placeHolderImage from "../../../../public/assets/images/placeholder.png";
import HomeBannerTab from "./HomeBannerTab";
import CategoryIconListTab from "./CategoryIconListTab";
import ProductList1Tab from "../HomePage5/ProductList1Tab";
import SliderProduct from "./SliderProduct";
import FeatureBlogTab from "../HomePage3/FeatureBlogTab";
import NewsLetterTab from "../HomePage1/NewsLetterTab";

const CairoHomePageAllTabsHomePage = forwardRef(
  ({ activeTab, values, setFieldValue }, ref) => {
    const [search, setSearch] = useState(false);
    const [customSearch, setCustomSearch] = useState("");
    const [tc, setTc] = useState(null);

    const { data: productData, isLoading: productLoader, refetch } = useQuery([product], () => request({
      url: product, params:
      {
          status: 1,
          search: customSearch ? customSearch : '',
          paginate: values['content']?.['products_ids']?.length > 15 ? values['content']?.['products_ids']?.length : 15,
          ids: customSearch ? null : values['content']['products_ids'].join() || null,
          with_union_products: values['content']?.['products_ids']?.length ? values['content']?.['products_ids']?.length >= 15 ? 0 : 1 : 0
      }
  }), {
      refetchOnWindowFocus: false, select: (res) => res?.data?.data.map((elem) => { return { id: elem.id, name: elem.name, image: elem?.product_thumbnail?.original_url || placeHolderImage, slug: elem?.slug } })
  });
  const { data: categoryData, isLoading: categoryLoader,refetch:categoryRefetch } = useQuery([Category], () => request({ url: Category, params: {  type: 'product' } }), {
      enabled:true,refetchOnWindowFocus: false, select: (res) => res?.data?.data?.map((elem) => { return { subcategories:elem.subcategories,id: elem.id, name: elem.name, image: elem?.category_icon?.original_url || placeHolderImage, slug: elem?.slug } })
  });

    useImperativeHandle(ref, () => ({
      call() {
        refetch();
        categoryRefetch()
      },
    }));

    // Added debouncing
    useEffect(() => {
      if (tc) clearTimeout(tc);
      setTc(setTimeout(() => setCustomSearch(search), 500));
    }, [search]);
    useEffect(() => {
      refetch();
    }, [customSearch]);
    if (productLoader || categoryLoader) return <Loader />;

    return (
      <Col xl="7" lg="8">
        <TabContent abContent activeTab={activeTab}>
          <TabPane tabId="1">
            <HomeBannerTab values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch}
            />
          </TabPane>
            <TabPane tabId="2">
                <CategoryIconListTab status={"categories_icon_list"} category={"categoryIconList"} values={values} setFieldValue={setFieldValue} categoryData={categoryData} />
            </TabPane>
            <TabPane tabId="3">
                <ProductList1Tab values={values} setFieldValue={setFieldValue} nameKey={'products_list_1'} productData={productData} customName={"productListImage1"} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="4">
             <CategoryIconListTab status={"categories_icon_list_2"} category={"categoryIconList2"} values={values} setFieldValue={setFieldValue} categoryData={categoryData} /> 
            </TabPane>
            <TabPane tabId="5">
              <SliderProduct values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="6">
            <CategoryIconListTab name="categories_products" status={"categories_products"} category={"categoriesProducts"} values={values} setFieldValue={setFieldValue} categoryData={categoryData} />
            </TabPane>
            <TabPane tabId="7">
              <FeatureBlogTab noDescription values={values} setFieldValue={setFieldValue} />
            </TabPane>
            <TabPane tabId="8">
              <NewsLetterTab  values={values} setFieldValue={setFieldValue} />
            </TabPane>
        </TabContent>
      </Col>
    );
  }
);

export default CairoHomePageAllTabsHomePage;
