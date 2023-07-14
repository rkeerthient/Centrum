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
import { ChatHeader, ChatPanel, ChatPopUp } from "@yext/chat-ui-react";
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

      <ChatHeadlessProvider config={botConfig}>
        <ChatPopUp
          title="Nutrition bot"
          customCssClasses={{
            buttonIcon: "bg-[#e3005d] text-white",
            button: "!bg-none !transition-none bg-[#e3005d]",
            panelCssClasses: {
              inputCssClasses: {
                sendButton: "bg-[#e3005d]",
                textArea:
                  "border border-gray-300 focus:ring-sky-500 focus:border-sky-500 text-base",
              },
            },
            headerCssClasses: {
              container: "!bg-none !bg-[#e3005d] !transition-none	",
              title: "overflow-hidden",
            },
          }}
        />
      </ChatHeadlessProvider>
    </SearchHeadlessProvider>
  );
};

export default PageLayout;
