import styles from "./BlogList.module.scss";
import { useState } from "react";
import { useRouter } from "@/src/navigation";
import { createKey } from "@/src/lib/utils/createKey";
import { createImageUrl } from "@/src/lib/hooks/createImageUrl";
import { Icon } from "@/src/components/shared/Icon/Icon";
import MainButton from "@/src/components/shared/MainButton/MainButton";
import AdminModal from "@/src/components/modals/AdminModal/AdminModal";
import Pagination from "../../Pagination/Pagination";
import MessageErrorLoading from "@/src/components/shared/MessageErrorLoading/MessageErrorLoading";
import BlogCard from "@/src/components/blog-page/BlogSection/BlogCard/BlogCard";
import CloseBtn from "@/src/components/shared/CloseBtn/CloseBtn";
import BlogArticle from "@/src/components/blog-page/BlogArticleSection/BlogArticle/BlogArticle";

export default function BlogList({ data, hendleRemove, hendleSetPage }) {
  const router = useRouter();
  // Шляхи сторінок
  const editBlogArticlePath = "/admin/blog/edit";

  const [idArticle, setIdArticle] = useState(null);
  const [fullArticle, setFullArticle] = useState(null);

  const closeModal = () => {
    setIdArticle(null);
    setFullArticle(null);
  };

  const okRemove = () => {
    hendleRemove(idArticle);
    setIdArticle(null);
    setFullArticle(null);
  };

  const readFullArticle = (value) => {
    setFullArticle(value);
  };

  if (fullArticle) {
    const{ title, text, date, imageUrl } = fullArticle

    return (
      <div className={styles.item}>
        <BlogArticle 
          imgUrl={createImageUrl(imageUrl)} 
          date={date} 
          title={title} 
          text={text}/>

        <CloseBtn 
          className={styles.closeBtn} 
          vaiant={'dark'} 
          onClick={()=>{readFullArticle(null)}}/>

        <div className={styles.btns}>
          <MainButton
            variant="admin"
            className={styles.btn}
            onClick={() => {
              router.push(`${editBlogArticlePath}/${fullArticle._id}`);
            }}
          >
            <Icon width={24} height={24} name="edit" />
          </MainButton>

          <MainButton
            variant="admin"
            onClick={() => {
              setIdArticle(fullArticle._id);
              setFullArticle(null);
            }}
            className={styles.btn}
          >
            <Icon width={24} height={24} name="remove" />
          </MainButton>
        </div>
      </div>
    );
  }

  return (
    <>
      {data?.results?.length ? (
        <ul className={styles.list}>
          {data.results?.map((el) => {
            return (
              <li key={createKey()} className={styles.item}>
                <BlogCard
                  id={el._id}
                  img={createImageUrl(el.imageUrl)}
                  title={el.title}
                  description={el.text}
                  date={el.date}
                  adminOnclick={() => {
                    readFullArticle(el);
                  }}
                />

                <div className={styles.btns}>
                  <MainButton
                    variant="admin"
                    className={styles.btn}
                    onClick={() => {
                      router.push(`${editBlogArticlePath}/${el._id}`);
                    }}
                  >
                    <Icon width={24} height={24} name="edit" />
                  </MainButton>

                  <MainButton
                    variant="admin"
                    onClick={() => {
                      setIdArticle(el._id);
                    }}
                    className={styles.btn}
                  >
                    <Icon width={24} height={24} name="remove" />
                  </MainButton>
                </div>
              </li>
            );
          })}

          {data.pagination.totalPages > 1 && (
            <li className={styles.pagination}>
              <Pagination
                pagination={data.pagination}
                hendleSetPage={hendleSetPage}
              />
            </li>
          )}
        </ul>
      ) : (
        <MessageErrorLoading variant="search" />
      )}

      <AdminModal
        isOpen={idArticle}
        handleCallback={closeModal}
        handleOkCallback={okRemove}
        title={"Ви впевнені, що хочете видалити статтю?"}
        btnBlok={true}
      ></AdminModal>
    </>
  );
}
