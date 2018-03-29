files=`ls ./finance`
for file in ${files[@]}
do 
    python convert.py ./finance/$file >> result.txt
    echo $file
done
