import assets from "../assets/assets.ts"
import { messagesDummyData } from "../assets/assets.ts"
import { useEffect, useRef } from "react"
import { formatMessageTime } from "../lib/utils.ts"

const ChatContainer: React.FC<{selectedUser: any, setSelectedUser: any}> = ({selectedUser, setSelectedUser}) => {

  const scrollEnd = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if(scrollEnd.current){
      scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return selectedUser ?(
    <div className="w-full overflow-scroll relative backdrop-blur-lg">
      {/* ------ header ------ */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img src={assets.profile_martin} alt="" className="w-8  rounded-full"/>
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          Martin Johnson
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>
        <img src={assets.arrow_icon} alt="" onClick={() => {setSelectedUser(null)}} className="md:hidden max-w-7" />
        <img src={assets.help_icon} alt="" className="max-md:hidden max-w-5" />
      </div>
      {/* chat area */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {
          messagesDummyData.map((msg: any, index: any) => (
            <div key={index} className={`flex items-center gap-2 justify-end ${msg.senderId !== selectedUser._id &&'flex-row-reverse' }`}>
             {msg.image ? (
              <img src={msg.image} alt="" className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8" />
             ) : (
              <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/50 text-white ${msg.senderId === selectedUser._id ? 'rounded-br-none' : 'rounded-bl-none'}`} >{msg.text}</p>
             )}
             <div className="text-center text-xs">
              <img src={msg.senderId === selectedUser._id ? assets.avatar_icon : assets.profile_martin} alt="" className="w-7 rounded-full" />
              <p className="text-gray-500">{formatMessageTime(msg.createdAt)}</p>
             </div>
            </div>
          ))}
          <div ref={scrollEnd}></div>
      </div>
      {/* ------ botton area ------ */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex items-center flex-1 bg-gray-100/12 px-3 rounded-full">
          <input type="text" placeholder="Send a message..." className="flex-1 text-sm p-3 border-none outline-none rounded-lg text-white placeholder-gray-400"/>
          <input type="file" id="image" accept="image/png, image/jpeg" hidden/>
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className="w-5 mr-2 cursor-pointer"/>
          </label>
        </div>
        <img src={assets.send_button} alt="" className="w-7 cursor-pointer"/>
      </div>
    </div>
  ):
  (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500  bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} alt="" className="max-w-16" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  )
}

export default ChatContainer