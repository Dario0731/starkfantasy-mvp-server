CREATE TABLE soccer_team (
    id VARCHAR(100) UNIQUE NOT NULL,
	leagueId varchar(100),
    name VARCHAR(200),
    image_path VARCHAR(300),
    CONSTRAINT PK_SoccerTeamID PRIMARY KEY (Id)
);

CREATE TABLE soccer_match (
    id VARCHAR(100) NOT NULL,
    homeTeamId VARCHAR(100),
    awayTeamId VARCHAR(100),
    matchDate DATETIME,
	winnerId VARCHAR (100),
   result Varchar(300)
    CONSTRAINT PK_SoccerMatchID PRIMARY KEY (Id),
    CONSTRAINT FK_SoccerMatchHomeTeamID FOREIGN KEY (HomeTeamId) REFERENCES soccer_team(Id),
    CONSTRAINT FK_SoccerMatchAwayTeamID FOREIGN KEY (AwayTeamId) REFERENCES soccer_team(Id)
);

CREATE TABLE soccer_pool (
    id VARCHAR(100) NOT NULL DEFAULT CAST(NEWID() AS VARCHAR(100)),
    matchId VARCHAR(100),
	userId varchar (150),
	isFinalized int,
	result varchar(300)
    CONSTRAINT PK_SoccerPoolID PRIMARY KEY (id),
    CONSTRAINT FK_SoccerPoolMatch FOREIGN KEY (matchId) REFERENCES soccer_match(id)
);


CREATE TABLE soccer_match (
    contract_address VARCHAR(150) NOT NULL,
    username VARCHAR(50),
    email VARCHAR(50),
    profile_url varchar(50),
        is_deleted int,
	created_at DATETIME,
   updated_at DATETIME
);
