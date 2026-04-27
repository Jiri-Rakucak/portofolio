import React from 'react';
import styled from 'styled-components';
import { webProjects } from './ProjectData';

const BrowserWrapper = styled.div`

`;
const BookmarksBar = styled.div`

`;
const BookmarkItem = styled.div`

`;
const NavigationPanel = styled.div`

`;
const NavigationButtons = styled.div`

`;
const AddressBar = styled.div`

`;
const MenuBar = styled.div`

`;
const MenuItem = styled.div`

`;
const ContentArea = styled.div`

`;
const SearchBar = styled.div`

`;
const Tab = styled.div`

`;
const TabContent = styled.div`

`;
const IconButton = styled.button`

`;


const Browser: React.FC = () => {
    return (
        <BrowserWrapper>
            <BookmarksBar>
                {webProjects.map(project => (
                    <BookmarkItem key={project.id}>
                        {project.name}
                    </BookmarkItem>
                ))}
            </BookmarksBar>
            <NavigationPanel>
                <NavigationButtons>
                    <IconButton>{"<"}</IconButton>
                    <IconButton>{">"}</IconButton>
                    <IconButton>{"⟳"}</IconButton>
                </NavigationButtons>
                <AddressBar>
                    <input type="text" value="https://example.com" readOnly /> //placeholder
                </AddressBar>
                <MenuBar>
                    <MenuItem>File</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>View</MenuItem>
                </MenuBar>
                <ContentArea>
                    <SearchBar>
                        <input type="text" placeholder="Search or enter address" />
                    </SearchBar>
                    <Tab>
                        <TabContent>
                            {webProjects.map(project => (
                                <Tab key={project.id}>
                                    <h2>{project.name}</h2>
                                    <p>{project.description}</p>
                                </Tab>
                            ))}
                        </TabContent>
                    </Tab>
                </ContentArea>
            </NavigationPanel>
        </BrowserWrapper>
    );
}
export default Browser;
