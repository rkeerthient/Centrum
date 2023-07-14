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
import {
  ChatHeadlessProvider,
  HeadlessConfig,
} from "@yext/chat-headless-react";
import { ChatHeader, ChatPanel } from "@yext/chat-ui-react";
import { IoChatbubblesSharp } from "react-icons/io5";
// import "@yext/chat-ui-react/bundle.css";

type Props = {
  _site?: any;
  children?: React.ReactNode;
};

const searcher = provideHeadless({ ...searchConfig });
const botConfig: HeadlessConfig = {
  apiKey: import.meta.env.YEXT_PUBLIC_BOT_API_KEY,
  botId: import.meta.env.YEXT_PUBLIC_BOT_ID,
};
const PageLayout = ({ _site, children }: Props) => {
  const [show_bot, setShow_bot] = useState(false);
  const headConfig = (title: string) => {
    return (
      <>
        <div className="bg-[#e3005d] flex justify-between items-center text-white font-bold p-2 rounded-t-2xl">
          <div>{title}</div>
          <AiOutlineClose onClick={() => setShow_bot(false)} />
        </div>
      </>
    );
  };
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
      <div className="my-8 fixed bottom-10 right-10 z-50 h-[500px] w-[400px] rounded-t-2xl">
        {show_bot ? (
          // <ChatHeadlessProvider config={botConfig}>
          //   <ChatPanel
          //     customCssClasses={{
          //       container: "border h-[500px] w-[400px] rounded-t-2xl",
          //       inputContainer: " flex justify-between items-center",
          //       messagesScrollContainer: "scroll",
          //     }}
          //     // header={headConfig("Nutrition bot")}
          //     showFeedbackButtons={false}
          //     header={
          //       <ChatHeader
          //         title="Clippy's Chatbot"
          //         showRestartButton={true}
          //         customCssClasses={{
          //           title: "text-white font-bold",
          //           container: "bg-[#e3005d] p-2 rounded-t-2xl",
          //         }}
          //       />
          //     }
          //   />
          // </ChatHeadlessProvider>
          <ChatHeadlessProvider config={botConfig}>
            <ChatPanel />
          </ChatHeadlessProvider>
        ) : (
          <IoChatbubblesSharp
            className="float-right text-5xl font-light"
            color="#e3005d"
            onClick={() => setShow_bot(true)}
          />
        )}
      </div>
    </SearchHeadlessProvider>
  );
};

export default PageLayout;
