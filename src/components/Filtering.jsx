import styled from 'styled-components';
import { useState } from 'react';

export default function Filtering({ selectedIdx }) {
    const categories = [
        { text: '전체', value: 'all' },
        { text: '여성복', value: 'female' },
        {
            text: '남녀공용',
            value: 'genderless',
        },
        { text: '상의 ', value: 'top' },
        { text: '바지 ', value: 'pants' },
        { text: '원피스', value: 'one-piece' },
    ];
    const [getTarget, setTarget] = useState('all');
    const handleTarget = target => {
        setTarget(target);
        selectedIdx(target);
    };
    return (
        <Filter>
            {categories.map((category, idx) => {
                return (
                    <li
                        key={category.value}
                        role="presentation"
                        value={category.value}
                        onClick={() => handleTarget(category.value)}
                        className={getTarget === category.value && 'active'}>
                        {category.text}
                    </li>
                );
            })}
        </Filter>
    );
}

const Filter = styled.ul`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 10px;

    & > li {
        padding: 6px 0;
        border-bottom: 4px solid transparent;
        font-size: 16px;
        color: #000;
        font-weight: 600;
        cursor: pointer;

        &:hover,
        &.active {
            border-bottom: 4px solid #000;
        }
    }
`;
