import { StarIcon } from "@heroicons/react/20/solid";
import * as React from "react";
import { useEffect, useState } from "react";
export interface ReviewInt {
  id: number;
  rating: number;
  content: string;
  authorName: string;
  authorEmail: string;
  url: string;
  publisherDate: number;
  locationId: string;
  publisherId: string;
  title: string;
  lastYextUpdateTime: number;
  comments: any[];
  status: string;
  flagStatus: string;
  apiIdentifier: string;
}

const Reviews = () => {
  const [revResp, setRevResp] = useState([]);
  const reviewsUrl = `https://api.yextapis.com/v2/accounts/me/reviews?api_key=481cd77edbb8b6ca70990581d5061710&v=20230101`;
  const id = "152870990-1";
  const fetchReviews = async () => {
    let requestUrl = reviewsUrl + "&entityIds=" + id;

    const response = await fetch(requestUrl);
    const data = await response.json();
    console.log(data.response);
    setRevResp(data.response);
  };

  useEffect(() => {
    fetchReviews();
  }, []);
  return (
    <>
      {revResp && (
        <div className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
          {revResp.map((review: ReviewInt) => (
            <div
              key={review.id}
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
                  <h3 className="text-sm font-medium text-gray-900">
                    {review.title}
                  </h3>

                  <div
                    className="mt-3 space-y-6 text-sm text-gray-500"
                    dangerouslySetInnerHTML={{ __html: review.content }}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                <p className="font-medium text-gray-900">{review.authorName}</p>
                <time className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0">
                  {review.publisherDate}
                </time>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Reviews;
