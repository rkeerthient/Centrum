import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import searchConfig from "./searchConfig";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
type Props = {
  _site?: any;
  children?: React.ReactNode;
};
const searcher = provideHeadless({ ...searchConfig });
// const config: HeadlessConfig = {
//   apiKey: "306ce71c1cb641af06555d32b4f54412",
//   botId: "nutrition-guide",
// };
const PageLayout = ({ _site, children }: Props) => {
  const [show_bot, setShow_bot] = useState(false);
  return (
    <SearchHeadlessProvider searcher={searcher}>
      <div className="bg-[#f6f6f6]">
        <div className="min-h-screen ">
          <div>
            <Header _site={_site}></Header>
          </div>
          {children}
          <Footer _site={_site}></Footer>
        </div>
      </div>
      {/* <div className="my-8 fixed bottom-10 right-10 z-50">
        {show_bot ? (
          <ChatHeadlessProvider config={config}>
            <ChatPanel
              customCssClasses={{
                container: "border h-[500px] w-[400px] rounded-t-2xl",
              }}
              header={header("Nutrition Bot")}
            />
          </ChatHeadlessProvider>
        ) : (
          <IoChatbubblesSharp
            className="float-right text-5xl font-light"
            color="#e3005d"
            onClick={() => setShow_bot(true)}
          />
        )}
      </div> */}
    </SearchHeadlessProvider>
  );
};

export default PageLayout;
