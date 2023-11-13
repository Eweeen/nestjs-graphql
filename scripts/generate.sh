if [ -z "$1" ]
then
    echo "Please provide a name for the generation"
    exit 1
fi

nest g mo $1 --no-spec
nest g s $1 --no-spec
nest g r $1 --no-spec

typeorm entity:create src/$1/entities/$1
mv src/$1/entities/$1.ts src/$1/entities/$1.entity.ts