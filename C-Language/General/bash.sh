read -p "Enter your input name: " input
read -p "Enter your output name: " output

gcc "./inputs/"$input".c" -o "./outputs/"$output".exe"
./outputs/$output.exe
