import { StarIcon } from "@heroicons/react/20/solid";
import * as React from "react";
import { useEffect, useState } from "react";
export interface Root {
  docs: Doc[];
  count: number;
}

export interface Doc {
  $key: Key;
  authorName: string;
  content: string;
  entity: Entity;
  rating: number;
  reviewDate: string;
  reviewId: number;
}

export interface Key {
  locale: string;
  primary_key: string;
}

export interface Entity {
  id: string;
}

const Reviews = () => {
  const [revResp, setRevResp] = useState<Root | any>([]);
  const reviewsUrl = `https://cdn.yextapis.com/v2/accounts/me/content/fetchReviews?api_key=${
    import.meta.env.YEXT_PUBLIC_APP_API_ID
  }&v=20230101`;
  const id = "152870990-1";
  const fetchReviews = async () => {
    let requestUrl = reviewsUrl + "&entity.id=" + id;

    const response = await fetch(requestUrl);
    const dataResp = await response.json();
    let data: Root = await dataResp.response;
    setRevResp(data);
  };
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  useEffect(() => {
    fetchReviews();
  }, []);
  return (
    <div className="mt-14 space-y-10 divide-y divide-gray-200 border-b border  border-gray-200 pb-10">
      {revResp.docs && (
        <>
          <h2 className="text-lg font-medium text-gray-900">Reviews</h2>
          <div className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
            {revResp.docs.map((review: Doc) => (
              <div
                key={review.$key.primary_key}
                className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
              >
                <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                  <div className="flex items-center xl:col-span-1">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            review.rating > rating
                              ? "text-yellow-400"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="ml-3 text-sm text-gray-700">
                      {review.rating}
                      <span className="sr-only"> out of 5 stars</span>
                    </p>
                  </div>

                  <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                    <div
                      className="mt-3 space-y-6 text-sm text-gray-500"
                      dangerouslySetInnerHTML={{ __html: review.content }}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                  <p className="font-medium text-gray-900">
                    {review.authorName}
                  </p>
                  <time className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0">
                    {review.reviewDate}
                  </time>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Reviews;
