for i in $(find $JAVALIB -name "*.jar");do CLASSPATH="$i:$CLASSPATH";done
export CLASSPATH
mkdir -p $BUILDPATH/classes
javac -d $BUILDPATH/classes $(find src -name "*.java")
cp component.properties $BUILDPATH
