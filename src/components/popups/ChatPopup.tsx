import { useRef, useState } from 'react'
import { AiOutlineClose, AiTwotoneCheckCircle } from 'react-icons/ai'
import { IoIosSend } from 'react-icons/io'
import { BsEmojiSmile, BsFillChatSquareDotsFill } from 'react-icons/bs'
import { MdOutlineAttachFile } from 'react-icons/md'

const ChatPopup: React.FC = () => {
  const [chat, setChat] = useState(false)
  const [value, setValue] = useState('')
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
            className='bottom-0 right-5 hidden h-[550px] w-[340px] rounded-t-md border
            opacity-0 transition-opacity'
            ref={chatRef}
          >
            <header className='flex w-full items-center rounded-t-md bg-gs_orange p-4'>
              <div className=''>
                <h2 className='text-xl font-light'>{"Let's chat!"}</h2>
                <p className='flex items-center gap-1 text-sm font-semibold'>
                  <AiTwotoneCheckCircle className='text-xs text-green-500' />
                  We will reply to you as soon as we can
                </p>
              </div>
              <div className=''>
                <AiOutlineClose onClick={() => { setChat(false) }} />
              </div>
            </header>

            <div className='h-chat w-full overflow-y-auto bg-yellow-600'>

            </div>

            <footer
              className='flex max-h-40 w-full items-center bg-white px-4 py-6'
            >
              <textarea
                placeholder='Type your message...'
                className='h-10 max-h-40 w-4/5 resize-none font-poppins font-extralight text-black
                outline-none'
                value={value}
                onChange={handleChange}
              />
              <div className='flex w-1/5 items-center justify-evenly gap-2 text-slate-700'>
                <BsEmojiSmile className='cursor-pointer' />
                {
                  value.length > 0
                    ? <IoIosSend className='cursor-pointer text-orange-500' />
                    : <MdOutlineAttachFile className='cursor-pointer' />
                }

              </div>
            </footer>
          </div>
          : <div
            className='fixed bottom-0 right-5 z-40 flex cursor-pointer items-center gap-5 bg-gs_orange
            px-6 py-3 mobile:h-16 mobile:w-16 mobile:justify-center
            mobile:rounded-full desktop:h-auto desktop:w-auto desktop:justify-normal
            desktop:rounded-b-none desktop:rounded-t-md'
            onClick={handleClick}
          >
            <BsFillChatSquareDotsFill className='text-2xl text-black' />
            <h3 className='text-2xl font-light text-black mobile:hidden desktop:block'>
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
