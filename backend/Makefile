export COMPOSE_COMMAND := docker compose --project-name nestjs-cli
export COMPOSE_IGNORE_ORPHANS := true

all: dev

clean:
	rm -f -r "code/build" "code/dist" "code/node_modules"

dev:
	${COMPOSE_COMMAND} --file docker-compose-dev.yml up --build

logs:
	${COMPOSE_COMMAND} logs --follow --tail="all"

prod:
	${COMPOSE_COMMAND} up

rm:
	${COMPOSE_COMMAND} down

rmi:
	${COMPOSE_COMMAND} down --rmi local

rmiv:
	${COMPOSE_COMMAND} down --rmi local --volumes

start:
	${COMPOSE_COMMAND} start

stop:
	${COMPOSE_COMMAND} stop

up:
	${COMPOSE_COMMAND} --file docker-compose-dev.yml up --detach

.PHONY: all clean dev logs prod rm rmi rmiv start stop up
