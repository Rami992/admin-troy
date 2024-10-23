import SettingContext from "@/Helper/SettingContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { RiEyeLine, RiPencilLine } from "react-icons/ri";
import NoSsr from "../../Utils/HOC/NoSsr";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";
import AnswerModal from "../Q&A/Widgets/AnswerModal";
import DeleteButton from "./DeleteButton";
import ProductDownload from "./ProductDownload";
import ViewDetails from "./ViewDetails";

const Options = ({ fullObj, mutate, type, moduleName, optionPermission, refetch, keyInPermission }) => {
  const pathname = usePathname();
  const [modal, setModal] = useState(false);
  const { settingObj } = useContext(SettingContext);
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"], keyInPermission ?? keyInPermission);
  return (
    <div className="custom-ul">
      <NoSsr>
        {optionPermission?.optionHead?.type == "View" ? (
          <ViewDetails fullObj={fullObj} tableData={optionPermission?.optionHead} refetch={refetch} />
        ) : (
          <>
            <div>
              {keyInPermission == "question_and_answer" && edit ? (
                <a onClick={() => setModal(true)}>
                  <RiPencilLine className="pencil" />
                </a>
              ) : (
                edit &&
                fullObj?.id &&
                !optionPermission?.noEdit && (
                  <>
                    {optionPermission?.editRedirect ? (
                      <Link href={"/" + optionPermission?.editRedirect + "/edit/" + fullObj.id}>
                        <RiPencilLine className="pencil" />
                      </Link>
                    ) : type == "post" && moduleName?.toLowerCase() == "tag" ? (
                      <Link href={`/${pathname.split("/")[1]}/tag/edit/${fullObj.id}`}>
                        <RiPencilLine className="pencil" />
                      </Link>
                    ) : type == "post" ? (
                      <Link href={`/${pathname.split("/")[1]}/category/edit/${fullObj.id}`}>
                        <RiPencilLine className="pencil" />
                      </Link>
                    ) : (
                      <Link href={`/${pathname.split("/")[1]}/edit/${fullObj.id}`}>
                        <RiPencilLine className="pencil" />
                      </Link>
                    )}
                  </>
                )
              )}
            </div>
            <div>{destroy && !optionPermission?.noDelete && <DeleteButton id={fullObj?.id} mutate={mutate} />}</div>
            {optionPermission?.optionHead.show && (
              <div>
                <a href={`${settingObj?.general?.site_url}/${optionPermission?.optionHead.show}/${fullObj?.slug}`} target="_blank" rel="noreferrer">
                  <RiEyeLine className="ri-pencil-line" />
                </a>
              </div>
            )}
            <div>{fullObj?.product_type == "digital" &&  optionPermission?.optionHead.type == "download" ? <ProductDownload fullObj={fullObj} tableData={optionPermission?.optionHead} /> : " "}</div>
          </>
        )}
        {modal && <AnswerModal refetch={refetch} fullObj={fullObj} modal={modal} setModal={setModal} />}
      </NoSsr>
    </div>
  );
};

export default Options;
