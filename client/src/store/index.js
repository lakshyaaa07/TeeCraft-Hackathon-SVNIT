import { color } from 'framer-motion';
import { proxy } from 'valtio';

const state = proxy({
    intro: true,
    color: '#00A9FF',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './logotc.png',
    fullDecal: './logotc.png'
});

export default state;