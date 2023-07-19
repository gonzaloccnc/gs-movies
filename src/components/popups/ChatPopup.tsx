import { BsFillChatSquareDotsFill } from 'react-icons/bs'

const ChatPopup: React.FC = () => {
  return (
    <div className='fixed right-5 bottom-0 bg-gs_orange flex items-center px-6 py-3
         gap-5 rounded-t-md cursor-pointer'
    >
      <BsFillChatSquareDotsFill className='text-2xl text-black' />
      <h3 className='text-2xl text-black font-poppins font-light'>{"Let's chat!"}</h3>
    </div>
  )
}

export {
  ChatPopup
}
