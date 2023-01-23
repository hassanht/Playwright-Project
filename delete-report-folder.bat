@echo on
set "folder_name=allure-results"
set "folder_path=%HOMEPATH%\%folder_name%"

if exist "%folder_path%" (
    rmdir /s /q "%folder_path%"
    echo The folder %folder_name% has been deleted.
) else (
    echo The folder %folder_name% does not exist.
)

