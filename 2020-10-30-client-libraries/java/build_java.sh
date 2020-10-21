#!/bin/sh
set -e

filename=Authentication.java
basename=$(basename $1 .java)
java_classes=stripe-java-20.14.0.jar:gson-2.8.5.jar:.

echo Compiling file: $filename
javac -classpath $java_classes $filename
echo ... OK. Running now.
java -classpath $java_classes $basename
