

install kafaka:
docker run -d --name broker -p 9092:9092 apache/kafka:latest

✅ To start the same existing container again:
docker start broker

⏹ To stop it:
docker stop broker

🔄 To check its status:
docker ps -a

❌ To remove it (only if you want to delete):
docker rm broker


----------------------------------------
to open producer terminal

docker exec --workdir /opt/kafka/bin/ -it broker sh

./kafka-topics.sh --bootstrap-server localhost:9092 --create --topic test-topic

./kafka-console-producer.sh --bootstrap-server localhost:9092 --topic test-topic


-------------------------

to open comsumer terminal

docker exec --workdir /opt/kafka/bin/ -it broker sh

./kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test-topic --from-beginning

----------------
