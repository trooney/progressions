BUILD_PATH="./dist"
EXPORT_PATH="./out"

.PHONY: clean build deploy

clean:
	@echo "Cleaning artifacts..."
	@rm -rf $(BUILD_PATH)
	@rm -rf $(EXPORT_PATH)

build:
	@echo "Building project..."
	@yarn build

deploy:
	@echo "Deploying project..."
	@ansible-playbook ansible/server.yml -i ansible/inventories/hosts.ini --ask-become-pass

build-and-deploy: clean build deploy
