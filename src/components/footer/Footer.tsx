import { FacebookLogoIcon, InstagramLogoIcon, WhatsappLogoIcon } from '@phosphor-icons/react'

function Footer() {

    let data = new Date().getFullYear()

    return (
        
            <div className="flex justify-center bg-teal-500  text-white px-2 w-full fixed bottom-0 left-0 z-50">
                <div className="container flex flex-col items-center py-2 md:py-1 gap-1 md:gap-1">
                    <p className='text-base md:text-xl font-bold text-center'>Farmácia VivaBem | Copyright: {data}</p>
                    <p className='text-sm md:text-lg text-center'>Acesse nossas redes sociais e entre em contato!</p>
                    <div className='flex flex-wrap justify-center gap-2 md:gap-2'>
                        <a href="https://www.instagram.com/farmaciavivabem" target="_blank" className="flex items-center">
                            <span className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
                                <InstagramLogoIcon size={32} className="w-full h-full" />
                            </span>
                        </a>
                        <a href="https://www.facebook.com/farmaciavivabem" target="_blank" className="flex items-center">
                            <span className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
                                <FacebookLogoIcon size={32} className="w-full h-full" />
                            </span>
                            <a href="https://wa.me/5511999999999" target="_blank" className="flex items-center">
                            <span className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
                                <WhatsappLogoIcon size={32} className="w-full h-full" />
                            </span>
                        </a>
                        </a>
                    </div>
                </div>
            </div>
        
    )
}

export default Footer