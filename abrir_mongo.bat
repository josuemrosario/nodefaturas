if not exist ".\fatura-db" (
    mkdir ".\fatura-db"
)

"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath .\fatura-db