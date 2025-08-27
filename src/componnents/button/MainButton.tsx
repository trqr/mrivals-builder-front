import styled from "styled-components";

const MainButton = styled.button`
    background: #343345;
    border: solid 1px #FDDE2B;
    color: white;
    padding: 10px 20px;
    display: inline-block;
    font-size: 15px;
    font-weight: 600;
    width: 120px;
    text-transform: uppercase;
    cursor: pointer;
    transform: skew(-21deg);
    position: relative; /* important pour ::before */

    span {
        display: inline-block;
        transform: skew(21deg);
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 100%;
        left: 0;
        background: #FDDE2B;
        opacity: 0;
        z-index: -1;
        transition: all 0.5s;
    }

    &:hover {
        color: #1C1C1C;
    }

    &:hover::before {
        left: 0;
        right: 0;
        opacity: 1;
    }
`;

export default MainButton;
