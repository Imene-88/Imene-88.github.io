import post1 from './assets/post1.jpg';
import post3 from './assets/post3.jpg';
import post4 from './assets/post4.jpg';
import post5 from './assets/post5.jpg';
import post7 from './assets/post7.jpg';
import post8 from './assets/post8.jpg';
import post9 from './assets/post9.jpg';
import post10 from './assets/post10.jpg';

import user1 from './assets/img3.jpg';
import user2 from './assets/img2.jpg';
import user3 from './assets/img1.jpg';
import user4 from './assets/img4.jpg';
import user5 from './assets/img9.jpg';
import user6 from './assets/img5.jpg';
import user7 from './assets/img6.jpg';
import user8 from './assets/img8.jpg';
import user9 from './assets/img10.jpg';
import user10 from './assets/img7.jpg';


export const Users = [
    {
        id: 1,
        full_name: "Mansouri Imene",
        username: "imene_15",
        profile_picture: user1,
    }, 
    {
        id: 2,
        full_name: "Mansouri Wafaa",
        username: "wafaa_15",
        profile_picture: user2,
    },
    {
        id: 3,
        full_name: "Sarah Lauren",
        username: "sarah_58",
        profile_picture: user3,
    }, 
    {
        id: 4,
        full_name: "Mylo Brian",
        username: "mb_88",
        profile_picture: user4,
    },
    {
        id: 5,
        full_name: "Victor Blue",
        username: "vic_99",
        profile_picture: user5,
    }, 
    {
        id: 6,
        full_name: "Violet Love",
        username: "vl_15",
        profile_picture: user6,
    },
    {
        id: 7,
        full_name: "Powder Blue V",
        username: "Jinx",
        profile_picture: user7,
    }, 
    {
        id: 8,
        full_name: "Silco Eye",
        username: "Piltover",
        profile_picture: user8,
    },
    {
        id: 9,
        full_name: "Vander Boss",
        username: "Power_88",
        profile_picture: user9,
    }, 
    {
        id: 10,
        full_name: "Caitlin Kiramman",
        username: "Blue_hair",
        profile_picture: user10,
    },
];

export const Posts = [
    {
        id: 1,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: post1,
        creation_date: "5 mins ago",
        owner_id: 1,
        likes: 32,
        comment: 9,
    },
    {
        id: 2,
        content: "Nullam semper, enim et gravida imperdiet, elit ligula vehicula velit, rhoncus bibendum erat mauris ut elit.",    
        creation_date: "10 mins ago",
        owner_id: 2,
        likes: 15,
        comment: 20,
    },
    {
        id: 3,
        image: post3,
        creation_date: "20 mins ago",
        owner_id: 3,
        likes: 2,
        comment: 1,
    },
    {
        id: 4,
        content: "Vivamus vehicula neque in accumsan tristique. Praesent eu ex mollis, gravida massa eget, vestibulum est. ",
        image: post4,
        creation_date: "50 mins ago",
        owner_id: 4,
        likes: 3,
        comment: 19,
    },
    {
        id: 5,
        content: "Nullam sem neque, blandit congue erat ac, rhoncus fringilla lectus.",
        image: post5,
        creation_date: "1 day ago",
        owner_id: 5,
        likes: 12,
        comment: 9,
    },
    {
        id: 6,
        content: "Nullam volutpat diam non ligula vehicula auctor. Aliquam luctus mauris massa, eu ultricies purus finibus id. Proin finibus vitae nisi nec consectetur. ",
        
        creation_date: "35 mins ago",
        owner_id: 6,
        likes: 6,
        comment: 4,
    },
    {
        id: 7,
        content: "Nunc tincidunt facilisis consequat. Mauris accumsan porttitor nunc, pharetra iaculis nisl congue ac. Curabitur varius diam vel commodo tincidunt. Nam eget velit posuere, commodo purus interdum, tincidunt velit. Sed in bibendum nunc.",
        image: post7,
        creation_date: "25 mins ago",
        owner_id: 7,
        likes: 60,
        comment: 12,
    },
    {
        id: 8,
        content: "Fusce finibus ultrices erat, vel lobortis sapien varius sed.",
        image: post8,
        creation_date: "16 mins ago",
        owner_id: 8,
        likes: 100,
        comment: 12,
    },
    {
        id: 9,
        content: "Aenean vel dictum enim, sed vulputate sem. Nullam aliquam orci lectus, sit amet tincidunt felis finibus lacinia.",
        image: post9,
        creation_date: "2 days ago",
        owner_id: 9,
        likes: 25,
        comment: 1,
    },
    {
        id: 10,
        image: post10,
        creation_date: "5 mins ago",
        owner_id: 10,
        likes: 32,
        comments: 19,
    }
];