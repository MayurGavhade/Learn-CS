# Prompt the user for input and output names
# Note: $input is a reserved automatic variable in PowerShell, so we use $inputName instead.
$inputName = Read-Host "Enter your input name"
$outputName = Read-Host "Enter your output name"

# Compile the C file using gcc
gcc ".\inputs\$inputName.c" -o ".\outputs\$outputName.exe"

# Execute the compiled output
& ".\outputs\$outputName.exe"
