import { css } from 'styled-components';

const sizes = {
    mp: '375px',
    tb: '768px',
    laptop: '1024px',
};

export default Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media screen and (max-width: ${sizes[label]}px) {
            ${css(...args)}
        }
    `;
    return acc;
}, {});
