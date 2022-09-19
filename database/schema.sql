set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"joinedAt" timestamptz NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."bikeInfo" (
	"bikeId" serial NOT NULL,
	"userId" int NOT NULL,
	"make" TEXT NOT NULL,
	"model" TEXT NOT NULL,
	"year" TEXT NOT NULL,
	"addedAt" timestamptz NOT NULL default now(),
	CONSTRAINT "bikeInfo_pk" PRIMARY KEY ("bikeId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."rideLogs" (
	"logId" serial NOT NULL,
	"userId" int NOT NULL,
	"location" TEXT NOT NULL,
	"caption" TEXT NOT NULL,
	"photoUrl" TEXT NOT NULL,
	"uploadedAt" timestamptz NOT NULL default now(),
	"visitedOn" DATE NOT NULL,
	"lat" float8 NOT NULL,
	"lng" float8 NOT NULL,
	CONSTRAINT "rideLogs_pk" PRIMARY KEY ("logId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "bikeInfo" ADD CONSTRAINT "bikeInfo_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "rideLogs" ADD CONSTRAINT "rideLogs_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
