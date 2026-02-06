"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useDashboard } from "@/app/context/dataContext";
import { useRouter } from "next/navigation";

interface TitleProps {
  numberOfArticle: number;
}

const CaseArticles: React.FC<TitleProps> = ({ numberOfArticle }) => {
  const { articles } = useDashboard();
  const router = useRouter();

  const handleSubmit = async (id: string, event: React.FormEvent) => {
    event.preventDefault();
    const articleFoundById = articles.find((article: any) => article.id == id);
    router.push(
      `/actualities/posts?lire=${articleFoundById.id}-${articleFoundById.title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[#,',\s]+/g, "-")
        .toLowerCase()}`
    );
  };
  return (
    <div className="container-fluid bg-light py-5">
      <div className="container py-5">
        <div
          className="mx-auto text-center wow fadeIn"
          data-wow-delay="0.1s"
          style={{ maxWidth: "500px" }}
        >
          <div className="btn btn-sm border rounded-pill text-primary px-3 mb-3">
            Case Study
          </div>
          <h1 className="mb-4">Explore Our Recent AI Case Studies</h1>
        </div>
        <div className="row g-4">
          {articles
            ?.slice(-numberOfArticle)
            .reverse()
            .map((value: any, key: any) => (
              <div
                key={key}
                className="col-lg-4 wow fadeIn"
                data-wow-delay="0.3s"
              >
                <div className="case-item position-relative overflow-hidden rounded mb-2">
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  >
                    {Array.isArray(value.filesUrl) && value.filesUrl.length > 0 && (
                    <img
                      className="img-fluid"
                      src={value.filesUrl[0]}
                      alt={value.title}
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  )}
                  </div>
                  <a className="case-overlay text-decoration-none" href="">
                    <h5 className="lh-base text-white mb-3">{value.title}</h5>
                    <small>Ajouté le {value.createdAt}</small>
                    <button
                      onClick={(e) => handleSubmit(value.id, e)}
                      className="btn btn-square rounded-pill btn-primary"
                    >
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-white"
                        width={14}
                      />
                    </button>
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CaseArticles;
