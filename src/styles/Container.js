import styled from 'styled-components'

export const HorizontalFlexBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.spaceAround ? 'space-around' : 'center'}
`