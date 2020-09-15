import React from 'react';
import {
    Wrapper,
    Paragraph,
    Heading3,
    UnorderedList,
    OrderedList,
    ListItem,
    Image,
    ImageBox,
    StartContainer,
    Text
} from './Landing.styled';

import book from '../../assets/book.png';
import Footer from '../../components/Footer/Footer';

const Landing: React.FC = () => {
    return (
        <Wrapper>
            <Heading3>No more post-its on your fridge!</Heading3>
            <Paragraph>
                Listify is a handy web application which allows you to create
                and store your to-do lists online, no matter the device.
            </Paragraph>{' '}
            <Paragraph>
                Access your task lists wherever you are! No matter what you do
                and who you are - be it dietitian, construction engineer or
                lawyer - be more organized and keep all your tasks in a single
                place.
            </Paragraph>
            <Paragraph>
                <strong>Key features:</strong>
            </Paragraph>
            <UnorderedList>
                <ListItem>
                    Access your to-do lists on any device through web browser
                </ListItem>
                <ListItem>Create multiple separate lists</ListItem>
                <ListItem>Track completion of your tasks</ListItem>
                <ListItem>
                    Add important notes or things to remember about your most
                    important tasks
                </ListItem>
                <ListItem>
                    Add a tag to any task to keep your tasks organized
                </ListItem>
                <ListItem>
                    Edit any aspect of a task on a fly with simple user
                    interface
                </ListItem>
            </UnorderedList>
            <StartContainer>
                <Text>
                    <Heading3>How to start?</Heading3>
                    <Paragraph>There are only two requirements:</Paragraph>
                    <OrderedList>
                        <ListItem>
                            Enable JavaScript in your browser (it is enabled by
                            default{' '}
                            <span role="img" aria-label="wink_emoji">
                                😉
                            </span>
                            ){' '}
                        </ListItem>
                        <ListItem>
                            Create your account and enjoy! You can use 'phoney'{' '}
                            <span role="img" aria-label="wink_emoji">
                                😉
                            </span>{' '}
                            address, like somethingsomething(at)test.com
                        </ListItem>
                    </OrderedList>
                </Text>
                <ImageBox>
                    <Image src={book} alt={'Book image'} />
                </ImageBox>
            </StartContainer>
            <Footer />
        </Wrapper>
    );
};

export default React.memo(Landing);
