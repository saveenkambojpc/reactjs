RESOURCE_GROUP := rg-non-prod-ayush-01
CONTAINERAPP_NAME := gmr-nprd-ayush-auth-ci-01
REVISION := gmr-nprd-ayush-auth-ci-01--y77ol16
REGISTRY := gmrnprdayushcontainerregistryci01 
SERVICE_NAME := master_fe_ms
RESTART_CMD := az containerapp revision restart
LOGS_STREM := az containerapp logs show 
REVISION_CMD := az containerapp revision list
DEPLOY_CMD := az acr build 

default: debug

r:
	ranger

restart:
	echo "Restarting the auth container"
	sleep 2
	${RESTART_CMD} -n ${CONTAINERAPP_NAME} -g ${RESOURCE_GROUP} --revision  ${REVISION}

log:
	${LOGS_STREM} -n ${CONTAINERAPP_NAME} -g ${RESOURCE_GROUP} --follow

exec:
	az containerapp exec -n ${CONTAINERAPP_NAME} -g ${RESOURCE_GROUP}

list-revision:
	${REVISION_CMD} -n ${CONTAINERAPP_NAME} -g ${RESOURCE_GROUP}

dr: deploy restart
	echo "DONE !!!!!!!!!!!!!!"

deploy:
	${DEPLOY_CMD} --registry  ${REGISTRY} --image ${SERVICE_NAME} .
	echo "Deployed the container !!!!!!!"

login:
	az login

shell:
	poetry shell

run: shell
	uvicorn main:app --port 8000  --host 0.0.0.0

dev: 
	pnpm dev

build:
	pnpm build

install:
	poetry install
