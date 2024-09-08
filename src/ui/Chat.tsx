import React from "react";

const ChatComponent = () => {
  return (
    <div className="w-2/3 mx-auto border flex flex-col">
      <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
        <div className="flex items-center">
          <div>
            <img
              className="w-10 h-10 rounded-full"
              src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
              alt="Expendables 4"
            />
          </div>
          <div className="ml-4">
            <p className="text-grey-darkest">New Movie! Expendables 4</p>
            <p className="text-grey-darker text-xs mt-1">
              Andrés, Tom, Harrison, Arnold, Sylvester
            </p>
          </div>
        </div>

        <div className="flex">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="#263238"
                fillOpacity=".5"
                d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
              ></path>
            </svg>
          </div>
          <div className="ml-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="#263238"
                fillOpacity=".5"
                d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"
              ></path>
            </svg>
          </div>
          <div className="ml-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="#263238"
                fillOpacity=".6"
                d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-auto"
        style={{ backgroundColor: "#DAD3CC" }}
      >
        <div className="py-2 px-3">
          <div className="flex justify-center mb-2">
            <div
              className="rounded py-2 px-4"
              style={{ backgroundColor: "#DDECF2" }}
            >
              <p className="text-sm uppercase">February 20, 2018</p>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div
              className="rounded py-2 px-4"
              style={{ backgroundColor: "#FCF4CB" }}
            >
              <p className="text-xs">
                Messages to this chat and calls are now secured with end-to-end
                encryption. Tap for more info.
              </p>
            </div>
          </div>

          <div className="flex mb-2">
            <div
              className="rounded py-2 px-3"
              style={{ backgroundColor: "#F2F2F2" }}
            >
              <p className="text-sm text-teal">Sylvester Stallone</p>
              <p className="text-sm mt-1">
                Hi everyone! Glad you could join! I am making a new movie.
              </p>
              <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
            </div>
          </div>

          <div className="flex mb-2">
            <div
              className="rounded py-2 px-3"
              style={{ backgroundColor: "#F2F2F2" }}
            >
              <p className="text-sm text-purple">Tom Cruise</p>
              <p className="text-sm mt-1">
                Hi all! I have one question for the movie
              </p>
              <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
            </div>
          </div>

          <div className="flex mb-2">
            <div
              className="rounded py-2 px-3"
              style={{ backgroundColor: "#F2F2F2" }}
            >
              <p className="text-sm text-orange">Harrison Ford</p>
              <p className="text-sm mt-1">Again?</p>
              <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
            </div>
          </div>

          <div className="flex mb-2">
            <div
              className="rounded py-2 px-3"
              style={{ backgroundColor: "#F2F2F2" }}
            >
              <p className="text-sm text-orange">Russell Crowe</p>
              <p className="text-sm mt-1">Is Andrés coming for this one?</p>
              <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
            </div>
          </div>

          <div className="flex mb-2">
            <div
              className="rounded py-2 px-3"
              style={{ backgroundColor: "#F2F2F2" }}
            >
              <p className="text-sm text-teal">Sylvester Stallone</p>
              <p className="text-sm mt-1">He is. Just invited him to join.</p>
              <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
            </div>
          </div>

          <div className="flex justify-end mb-2">
            <div
              className="rounded py-2 px-3"
              style={{ backgroundColor: "#E2F7CB" }}
            >
              <p className="text-sm mt-1">Glad to be here! :D</p>
              <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-grey-lighter px-4 py-4 flex items-center">
        <div>
          <svg
            className="w-6 h-6 text-grey"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M1.5 5.5v13h21v-13h-21zm19.5 11.993h-18v-10.986h18v10.986zm-8.662-1.974l-4.748-3.519 4.748-3.511v7.03zm.662-9.519l7 5.169-7 5.163v-10.332z" />
          </svg>
        </div>
        <div className="flex-1 mx-4">
          <input
            className="w-full border rounded-full px-2 py-2"
            type="text"
            placeholder="Type a message..."
          />
        </div>
        <div>
          <svg
            className="w-6 h-6 text-grey"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 22h-1v-5h1v5zm-1-6.001h1v-14.999h-1v14.999zm1-15.999h1v-5h-1v5z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
