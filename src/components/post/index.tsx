"use client";

import { useDashboard } from "@/app/context/dataContext";
import HeaderSecond from "../headerSeconde";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import DOMPurify from "dompurify";

interface TitleProps {
  texts: string;
  links: string;
}

const PostPage: React.FC<TitleProps> = ({ texts, links }) => {
  const { projects, articles, articleFound, setArticleFound } = useDashboard();

  const path = usePathname()?.split("/")[1] ?? "";

  const searchParams = useSearchParams();

  const articleId = useMemo(() => {
    const lire = searchParams?.get("lire");
    if (!lire) return null;
    const id = lire.split("-")[0];
    return Number(id) || null;
  }, [searchParams]);

  useEffect(() => {
    if (!articleId) return;

    if (path === "project") {
      const found = projects?.find(
        (project: any) => project.id === articleId
      );
      setArticleFound(found);
    }

    if (path === "actualities") {
      const found = articles?.find(
        (article: any) => article.id === articleId
      );
      setArticleFound(found);
    }
  }, [articleId, path, projects, articles, setArticleFound]);

  return (
    <>
      <HeaderSecond
        pageName={articleFound?.title ?? ""}
        text={texts}
        links={links}
      />

      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              {Array.isArray(articleFound?.filesUrl) &&
                articleFound.filesUrl.length > 0 && (
                  <img
                    className="py-5"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      display: "block",
                    }}
                    src={articleFound.filesUrl[0]}
                    alt={articleFound.title}
                  />
                )}

              <span className="text-muted d-block mb-3">
                Publié le {articleFound?.createdAt}
              </span>

              {articleFound?.contain && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(articleFound.contain),
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default PostPage;
