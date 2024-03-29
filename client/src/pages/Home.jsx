import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { CustomButton } from '../components';
import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from '../config/motion';

import React from "react"

const Home = () => {
    const snap = useSnapshot(state);
    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className='home' {...slideAnimation('left')}>
                    <motion.header {...slideAnimation("down")}>
                        <img src="./teecraft2.png" 
                             alt="logo" 
                             className='w-19 h-12 object-contain'/>
                    </motion.header>

                    <motion.div className="home-content" 
                    {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className="head-text">TeeCraft <br 
                             className="xl:block hidden" />AI T-SHIRTS.</h1>
                        </motion.div>

                        <motion.div {...headContentAnimation}
                                    className='flex flex-col gap-5'
                        >
                            <p className='max-w-md font-normal text-gray-600 text- 
                             base'>Whether you're looking to make a bold fashion statement, commemorate a special occasion, or promote your brand, our platform offers endless possibilities. Choose from a wide range of colors, fonts, graphics, and <strong> styles to design T-shirts that reflect your unique personality</strong> and vision.  
                                 elit</p>

                                 <CustomButton
                                    type = "filled"
                                    title = "Customize It"
                                    handleClick={() => state.intro = false}
                                    customStyles="w-fit px-4 py-2.5 font-bold text- 
                                      sm"
                                />
                                 
                        </motion.div>
                    </motion.div>

                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default Home
