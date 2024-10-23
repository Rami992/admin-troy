import { useEffect, useState } from 'react';
import { RiFileCopyLine, RiQuestionLine } from 'react-icons/ri';
import ShowModal from '../../Elements/Alerts&Modals/Modal';
import Btn from '../../Elements/Buttons/Btn';
import useCreate from '../../Utils/Hooks/useCreate';
import { useTranslation } from "react-i18next";

const TableDuplicateOption = ({ isReplicate, url, isCheck, refetch, setIsCheck }) => {

    const { t } = useTranslation('common');
    const [modal, setModal] = useState(false);
    const { data, mutate, isLoading } = useCreate(`${url}/${isReplicate?.replicateAPI}`)
    const onSubmit = (productIds) => {
        mutate({ ids: productIds })
    }
    useEffect(() => {
        if (data) {
            data?.status == 200 && refetch(); setModal(false); setIsCheck([])
        }
    }, [isLoading])
    return (
        <>
            <a className="align-items-center btn btn-outline btn-sm d-flex" onClick={() => setModal(true)}><RiFileCopyLine /> {t("Duplicate")}
            </a>
            <ShowModal open={modal} close={false}
                buttons={
                    <>
                        <Btn title="No" onClick={() => setModal(false)} className="btn-md btn-outline fw-bold" />
                        <Btn title="Yes" onClick={() => onSubmit(isCheck)} loading={Number(isLoading)} className="btn-theme btn-md fw-bold" />
                    </>
                }>
                <div className="remove-box">
                    <div className="remove-icon">
                        <RiQuestionLine className="icon-box wo-bg" />
                    </div>
                    <h5 className="modal-title">{t("Confirmation")}</h5>
                    <p>{t("Areyousureyouwanttoproceed?")} </p>
                </div>
            </ShowModal>
        </>
    )
}

export default TableDuplicateOption