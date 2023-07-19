import { useRef, useState } from 'react'
import { AiOutlineClose, AiTwotoneCheckCircle } from 'react-icons/ai'
import { IoIosSend } from 'react-icons/io'
import { BsEmojiSmile, BsFillChatSquareDotsFill } from 'react-icons/bs'
import { MdOutlineAttachFile } from 'react-icons/md'

const ChatPopup: React.FC = () => {
  const [chat, setChat] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const chatRef = useRef<HTMLDivElement | null>(null)

  const handleClick = (): void => {
    setChat(true)
    setTimeout(() => {
      chatRef.current?.classList.remove('hidden', 'opacity-0')
      chatRef.current?.classList.add('fixed')
    }, 500)
  }

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setValue(e.target.value)
  }

  return (
    <>
      {
        chat
          ? <div
            className='hidden right-5 bottom-0 h-[550px] border rounded-t-md w-[340px]
            opacity-0 transition-opacity'
            ref={chatRef}
          >
            <header className='w-full flex items-center p-4 bg-gs_orange rounded-t-md'>
              <div className=''>
                <h2 className='text-xl font-light'>{"Let's chat!"}</h2>
                <p className='text-sm font-semibold flex items-center gap-1'>
                  <AiTwotoneCheckCircle className='text-xs text-green-500' />
                  We will reply to you as soon as we can
                </p>
              </div>
              <div className=''>
                <AiOutlineClose onClick={() => { setChat(false) }} />
              </div>
            </header>

            <div className='w-full h-chat bg-yellow-600 overflow-y-auto'>

            </div>

            <footer
              className='bg-white w-full px-4 py-6 flex items-center max-h-40'
            >
              <textarea
                placeholder='Type your message...'
                className='outline-none text-black resize-none h-10 max-h-40 w-4/5 font-poppins
                font-extralight'
                value={value}
                onChange={handleChange}
              />
              <div className='w-1/5 text-slate-700 flex items-center gap-2 justify-evenly'>
                <BsEmojiSmile className='cursor-pointer' />
                {
                  value.length > 0
                    ? <IoIosSend className='text-orange-500 cursor-pointer' />
                    : <MdOutlineAttachFile className='cursor-pointer' />
                }

              </div>
            </footer>
          </div>
          : <div
            className='fixed z-40 right-5 bottom-0 bg-gs_orange flex items-center px-6 py-3
            gap-5 desktop:rounded-t-md cursor-pointer desktop:justify-normal desktop:h-auto
            desktop:rounded-b-none desktop:w-auto mobile:rounded-full mobile:w-16
            mobile:h-16 mobile:justify-center'
            onClick={handleClick}
          >
            <BsFillChatSquareDotsFill className='text-2xl text-black' />
            <h3 className='mobile:hidden desktop:block text-2xl text-black font-light'>
              {"Let's chat!"}
            </h3>
          </div>
      }
    </>
  )
}

export {
  ChatPopup
}
