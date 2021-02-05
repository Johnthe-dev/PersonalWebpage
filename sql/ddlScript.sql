use blog;

drop table if exists relationships;
drop table if exists post;

-- this table will contain the posts
create table post (
    postId VARCHAR(250) not null, -- specially formatted abcde-12345-edced would be post edced in category abcde and subcategory 12345. May revisit later.
    postContent TEXT,
    postDate DATETIME(6) not null,
    postTitle VARCHAR(200) not null,
    primary key (postId)
);

-- this table will contain related posts as a weak entity
create table relationships (
    firstPost varchar(250) not null,
    secondPost varchar(250) not null,
    foreign key (firstPost) references post(postId),
    foreign key (secondPost) references post(postId),
    primary key (firstPost, secondPost)
);