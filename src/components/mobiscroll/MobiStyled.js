import styled from 'styled-components'

export const MobiStyled = styled.div`
.mbsc-input {
    input.mbsc-control {
        height: 50px;
        padding: 0 18px 3px;
        border: 1px solid #dbe2e8;
        border-radius: 5px;
        color: #606975;
        text-align: center;
    }
}
.mbsc-ios.mbsc-control-w:before,
.mbsc-ios.mbsc-control-w:after {
    border-top: none;
}

.mbsc-ios.mbsc-input input:disabled, .mbsc-ios.mbsc-input textarea:disabled, .mbsc-ios.mbsc-input .mbsc-control:disabled ~ input, .mbsc-ios.mbsc-input .mbsc-control:disabled ~ .mbsc-ic {
    color: #9EA9B9;
    background-color: #F5F5F5;
    border: 1px solid #E3E8ED;
    opacity: 1;
}

.mbsc-ios.mbsc-fr-pointer .mbsc-fr-persp .mbsc-fr-popup .mbsc-fr-w {
    
    @media only screen and (min-height: 320px) and (max-height: 379px) {
        height: 200px !important;
    }
    @media only screen and (min-height: 380px) and (max-height: 399px) {
        height: 200px !important;
    }
    @media only screen and (min-height: 400px) and (max-height: 479px) {
        height: 200px !important;
    }
    @media only screen and (min-height: 480px) and (max-height: 499px) {
        height: 200px !important;
    }
    @media only screen and (min-height: 500px) and (max-height: 559px) {
        height: 200px !important;
    }
    @media only screen and (min-height: 560px) and (max-height: 719px) {
        height: 200px !important;
    }
    @media only screen and (min-height: 720px) and (max-height: 799px) {
        height: 200px !important;
    }
    @media only screen and (min-height: 800px) and (max-height: 811px) {
        height: 200px !important;
    }
    @media only screen and (min-height: 812px) and (max-height: 859px) {
        height: 540px;
    }
    @media only screen and (min-height: 860px) {
        height: 610px;
    }
}

`