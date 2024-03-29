drop table if exists relationships;
drop table if exists post;
drop table if exists message;

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
    relationshipsFirstPost varchar(250) not null,
    relationshipsSecondPost varchar(250) not null,
    foreign key (relationshipsFirstPost) references post(postId),
    foreign key (relationshipsSecondPost) references post(postId),
    primary key (relationshipsFirstPost, relationshipsSecondPost)
);

-- this table will contain all messages sent to me via website
create table message (
    messageId BINARY(16) not null,
    messageContent TEXT not null,
    messageDate DATETIME(6) not null,
    primary key (messageId)
)