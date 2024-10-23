import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import WelcomeImage from "../../../public/assets/images/bg.jpg";
import emptyWallet from "../../../public/assets/images/svg/empty-wallet.svg";
import medalStar from "../../../public/assets/images/svg/medal-star.svg";
import people from "../../../public/assets/images/svg/people.svg";
import receipt2 from "../../../public/assets/images/svg/receipt-2.svg";
import shopWhite from "../../../public/assets/images/svg/shop-white.svg";
import SettingContext from "../../Helper/SettingContext";
import request from "../../Utils/AxiosUtils";
import { StatisticsCountAPI } from "../../Utils/AxiosUtils/API";
import OrderStatus from "./OrderStatus";
import VendorSection from "./VendorSection";
import { useRouter } from "next/navigation";
import Img from "@/Elements/Img";

const TopDashSection = ({ role }) => {
  const { t } = useTranslation("common");
  const [filterType, setFilterType] = useState("All Time");
  const [filterValue, setFilterValue] = useState(null);
  const { convertCurrency } = useContext(SettingContext);
  const router = useRouter();

  const { data, refetch } = useQuery([StatisticsCountAPI], () => request({ url: StatisticsCountAPI, params: { filter_by: filterValue } }, router), { refetchOnWindowFocus: false, select: (data) => data?.data });
  useEffect(() => {
    if (filterValue != null) {
      refetch();
    }
  }, [filterValue]);

  return (
    <section className="dashboard-tiles">
      <Container fluid={true} className="p-0">
        <Row className="g-sm-4 g-3">
          <Col md="4" className="welcome-tiles">
            <Card className="m-0">
              <Image height={162} width={497} src={WelcomeImage} className="img-fluid" alt="box-time" />
              <CardBody>
                <h2>{t("WelcomeBackAdmin")}</h2>
                <p>{t("ManageApplication'sDataAndOperationsWithRealTimeAnalytics,UserManagementToolsAndCustomizableReports")}.</p>
              </CardBody>
            </Card>
          </Col>
          <OrderStatus setFilterValue={setFilterValue} data={data} filterType={filterType} setFilterType={setFilterType} />
        </Row>

        <div className="card-bottom-space">
          <Row className="row-cols-xxl-5 row-cols-md-3 row-cols-sm-2 row-cols-1 g-sm-4 g-3">
            <Col className="widget-card-box">
              <a className="widget-card card mb-0">
                <div className="widget-icon">
                  <Image height={26} width={26} src={emptyWallet} className="img-fluid" alt="emptyWallet" />
                </div>
                <div>
                  <h6>{t("TotalRevenue")}</h6>
                  <h2>{convertCurrency(data?.total_revenue || 0, true)}</h2>
                </div>
              </a>
            </Col>
            {role !== "vendor" && (
              <>
                <Col className="widget-card-box">
                  <Link href={`/product`} className="widget-card card mb-0">
                    <div className="widget-icon">
                      <Image height={26} width={26} src={receipt2} className="img-fluid" alt="receipt2" />
                    </div>
                    <div>
                      <h6>{t("TotalProducts")}</h6>
                      <h2>{data?.total_products}</h2>
                    </div>
                  </Link>
                </Col>
                <Col className="widget-card-box">
                  <Link href={`/order`} className="widget-card card mb-0">
                    <div className="widget-icon">
                      <Image height={26} width={26} src={medalStar} className="img-fluid" alt="medal-star" />
                    </div>
                    <div>
                      <h6>{t("TotalOrders")}</h6>
                      <h2>{data?.total_orders}</h2>
                    </div>
                  </Link>
                </Col>
                <Col className="widget-card-box">
                  <Link href={`/store`} className="widget-card card mb-0">
                    <div className="widget-icon">
                      <Image height={26} width={26} src={shopWhite} className="img-fluid" alt="shop-white" />
                    </div>
                    <div>
                      <h6>{t("TotalStores")}</h6>
                      <h2>{data?.total_stores}</h2>
                    </div>
                  </Link>
                </Col>
                <Col className="widget-card-box">
                  <Link href={`/user`} className="widget-card card">
                    <div className="widget-icon">
                      <Image height={26} width={26} src={people} className="img-fluid" alt="people" />
                    </div>
                    <div>
                      <h6>{t("TotalUser")}</h6>
                      <h2>{data?.total_users}</h2>
                    </div>
                  </Link>
                </Col>
              </>
            )}
            {role === "vendor" && <VendorSection statistics={data} convertCurrency={convertCurrency} />}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default TopDashSection;
